import { createWriteStream } from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { CardDocument } from '../schemas/Card';

const qrcodeSize = 60;
const numberOfRows = 5;
const numberOfColumns = 5;
const columnLabels = ['B', 'I', 'N', 'G', 'O'];

// const getPath = (key: string) => `./src/files/${key}.pdf`;

const getCardSize = (pageWidth: number) => (pageWidth - 60) / 2;

const getDefaultY = (pageH: number, cardH: number) => (pageH - 2 * cardH) / 3;
const getDefaultX = (pageW: number, cardW: number) => (pageW - 2 * cardW) / 4;

const getCardHeaderHeight = (cardH: number) => cardH * 0.15;

const getCardColumnWidth = (cardW: number) => cardW / numberOfColumns;
const getCardRowHeight = (cardH: number, headerH: number) =>
  (cardH - headerH) / numberOfRows;

async function generateQRCode(value: string) {
  await QRCode.toFile('./src/files/qrcode.png', String(value), {
    width: qrcodeSize,
    type: 'png',
    margin: 0,
  });
}

export async function draw(
  cards: CardDocument[],
  qrcode: boolean,
  title: string,
) {
  const fileName = `${(Math.random() * 100)
    .toString()
    .slice(4, 14)
    .toString()}.pdf`;
  const filePath = path.resolve('src', 'files', fileName);

  const document = new PDFDocument({
    margin: 1,
    size: 'A4',
    layout: 'portrait',
  });

  document.pipe(createWriteStream(filePath));

  const pageWidth = document.page.width;
  const pageHeight = document.page.height;

  const cardSize = getCardSize(pageWidth);
  const defaultY = getDefaultY(pageHeight, cardSize);
  const defaultX = getDefaultX(pageWidth, cardSize);
  const cardHeaderHeight = getCardHeaderHeight(cardSize);
  const cardColumnWidth = getCardColumnWidth(cardSize);
  const cardRowHeight = getCardRowHeight(cardSize, cardHeaderHeight);

  function drawDashedLines() {
    document
      .moveTo(pageWidth / 2, 0)
      .lineTo(pageWidth / 2, pageHeight)
      .moveTo(0, pageHeight / 2)
      .lineTo(pageWidth, pageHeight / 2)
      .dash(5, { space: 5 })
      .stroke('#cccccc')
      .undash();
  }

  function drawCode(code: number | string, x: number, y: number) {
    const length = 6;
    const text = '0'.repeat(length - String(code).length) + code;
    document
      .fontSize((2 * cardSize) / (numberOfColumns * numberOfRows) - 6)
      .text(`Cód.: ${text}`, x, y);
  }

  function drawTitle(text: string, posX: number, posY: number, width: number) {
    document
      .fontSize((2 * cardSize) / (numberOfColumns * numberOfRows) - 1)
      .font('Helvetica-Bold')
      .text(text, posX, posY, {
        width,
        align: 'center',
      });
  }

  function drawNumbers(numbers: Array<number[]>, posX: number, posY: number) {
    numbers.forEach((col, index) => {
      const x = posX + index * cardColumnWidth;
      col.forEach((value, valueIndex) => {
        const y = posY + cardRowHeight * (valueIndex + 1);
        const options = { align: 'center', width: cardColumnWidth };
        document.text(
          value === 0 ? '' : String(value),
          x,
          y + 0.5 * (cardRowHeight - document.heightOfString(String(value))),
          options,
        );
      });
    });
  }

  async function drawCard(
    values: Array<number[]>,
    pos: number,
    code: number,
    cardId: string,
  ) {
    let positionX = defaultX;
    let positionY = defaultY;
    if (pos % 2 === 0) {
      positionX += cardSize + 2 * positionX;
    }
    if (pos > 2) {
      positionY = positionY * 2.5 + cardSize;
    }

    if (qrcode) {
      await generateQRCode(cardId);
    }

    const titleX = qrcode ? positionX + qrcodeSize + 10 : positionX;
    const width = qrcode ? cardSize - (qrcodeSize + 10) : cardSize;
    drawTitle(
      title,
      titleX,
      positionY - (qrcodeSize + (defaultY - qrcodeSize) / 2),
      width,
    );

    // card container
    document.rect(positionX, positionY, cardSize, cardSize).stroke('black');

    document
      .fontSize((2 * cardSize) / (numberOfColumns * numberOfRows) + 3)
      .font('Helvetica-Bold');

    // rows
    for (let i = 0; i < numberOfRows; i += 1) {
      const posY = positionY + cardHeaderHeight + i * cardRowHeight;
      document.rect(positionX, posY, cardSize, cardRowHeight).stroke('black');
    }

    // columns
    for (let i = 0; i < numberOfColumns; i += 1) {
      const posY = positionY + cardHeaderHeight;
      const posX = positionX + cardColumnWidth * i;
      document

        .rect(posX, posY, cardColumnWidth, cardSize - cardHeaderHeight)
        .stroke('black');
    }

    // labels: B I N G O
    columnLabels.forEach((label, index) => {
      const x = positionX + index * cardColumnWidth;
      const options = { align: 'center', width: cardColumnWidth };
      document.text(
        label,
        x,
        positionY + 0.6 * (cardRowHeight - document.heightOfString(label)),
        options,
      );
    });

    document
      .fontSize((2 * cardSize) / (numberOfColumns * numberOfRows))
      .font('Helvetica');

    // card -> values/numbers
    drawNumbers(values, positionX, positionY);

    drawCode(
      code,
      positionX,
      positionY + cardHeaderHeight + 15 + numberOfRows * cardRowHeight,
    );

    if (qrcode) {
      document.image(
        './src/files/qrcode.png',
        positionX,
        positionY - (qrcodeSize + (defaultY - qrcodeSize) / 2),
        { width: qrcodeSize, height: qrcodeSize },
      );
    }
    drawDashedLines();
    if (pos === 4) {
      document.save().addPage({ margin: 1, size: 'A4', layout: 'portrait' });
    }
  }

  await Promise.all(
    cards.map(async (card, index) => {
      const pos = (index + 1) % 4;
      await drawCard(card.numbers, pos === 0 ? 4 : pos, card.code, card._id);
    }),
  );

  document.end();

  return filePath;
}
