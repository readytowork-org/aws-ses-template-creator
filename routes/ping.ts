import {
  SESClient,
  CreateTemplateCommand,
  SendTemplatedEmailCommand,
  UpdateTemplateCommand,
  DeleteTemplateCommand,
} from "@aws-sdk/client-ses"
import express, { Request, Response } from "express"
import * as fs from "fs"
import * as path from "path"

const router = express.Router()

const client = new SESClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_PROJECT_REGION,
})

router.get("/create", async (req: Request, res: Response) => {
  let templates = [
    {
      file: "./templates/welcome.txt",
      subject: "Welcome email",
    },
  ]
  try {
    for (let i = 0; i < templates.length; i++) {
      const filePath = templates[i].file
      const fileName = path.basename(filePath, ".txt")
      const emailTemplate = fs.readFileSync(filePath, "utf-8")
      const subject = templates[i].subject
      const template = new CreateTemplateCommand({
        Template: {
          TemplateName: fileName,
          HtmlPart: emailTemplate,
          SubjectPart: subject,
        },
      })
      await client.send(template)
      console.log("Created", i)
    }
    res.status(200).json({ message: "email template created" })
  } catch (error) {
    console.log(error)
  }
})

router.get("/send", async (req: Request, res: Response) => {
  try {
    const emailData = {
      name: "John Doe",
      app: "AWS SES Templated Email",
    }
    const emailBody = new SendTemplatedEmailCommand({
      Destination: { ToAddresses: ["receiver@example.com"] },
      TemplateData: JSON.stringify({ data: emailData }),
      Source: process.env.AWS_VERIFIED_EMAIL,
      Template: "welcome",
    })
    await client.send(emailBody)
    res.status(200).json({ message: "templated email sent" })
  } catch (error) {
    throw error
  }
})

router.get("/update", async (req: Request, res: Response) => {
  let templates = [
    {
      file: "./templates/welcome.txt",
      subject: "Welcome email",
    },
  ]
  try {
    for (let i = 0; i < templates.length; i++) {
      const filePath = templates[i].file
      const fileName = path.basename(filePath, ".txt")
      const emailTemplate = fs.readFileSync(filePath, "utf-8")
      const subject = templates[i].subject
      const data = new UpdateTemplateCommand({
        Template: {
          TemplateName: fileName,
          HtmlPart: emailTemplate,
          SubjectPart: subject,
        },
      })
      await client.send(data)
      console.log("done", i)
    }
    res.status(200).json({ message: "templated email updated" })
  } catch (error) {}
})

router.get("/delete", async (req: Request, res: Response) => {
  try {
    const data = new DeleteTemplateCommand({
      TemplateName: "welcome",
    })
    await client.send(data)
    res.status(200).json({ message: "templated email deleted" })
  } catch (error) {}
})
export default router
