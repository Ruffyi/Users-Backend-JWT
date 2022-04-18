import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (options: any) => {
	// !) Create a transporter

	const transporter = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 25,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	// 2) Define the email options

	const mailOptions = {
		from: 'Kamil Naskret <kam.nas21@wp.pl>',
		to: options.email,
		subject: options.subject,
		text: options.message,
	};
	// 3) Send email via nodemailer

	await transporter.sendMail(mailOptions);
};

export default sendEmail;
