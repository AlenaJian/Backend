import nodemailer from 'nodemailer'

const nodeMail = async(data)=>{
    const transport = nodemailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service:process.env.SMPT_SERVICE,
        secure:true,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        }
    });

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:data.email,
        subject:data.subject,
        // html:data.html,
        text:data.text,
       
    }

    await transport.sendMail(mailOptions)

}
export default nodeMail
