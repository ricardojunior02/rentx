import { SES } from 'aws-sdk';
import fs from 'fs';
import hbs from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf8');

    const templateParse = hbs.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <ricardojunior199502@gmail.com>',
      subject,
      html: templateHtml,
    });
  }
}

export { SESMailProvider };
