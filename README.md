# AWS SES Email Template Creator

Repository for creating templated email in AWS SES using aws-sdk v3

## How to get started ? 🚀

- Create `.env` in the root directory taking `.env.example` as reference.
- Install dependencies using `yarn install` or `npm install` command.
- Create your email template in `/templates` folder in `.txt` format
- Enclose variables with `{{}}` i.e `{{data.name}}` will be replaced by your value

## Routes

| Route   | Description                                              |
| ------- | -------------------------------------------------------- |
| /create | Creates email templates in AWS SES                       |
| /send   | Send templated email with verified email with AWS SES    |
| /update | Updates email templates in AWS SES                       |
| /delete | Delete email templates in AWS SES by email template name |
