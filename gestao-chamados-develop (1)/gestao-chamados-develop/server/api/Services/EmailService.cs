using api.Dto.Email;
using api.Interfaces.Services;
using Microsoft.Extensions.Options;
using System.Net.Mail;

namespace api.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            string from = _emailSettings.SmtpUser;
            MailMessage message = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            using (SmtpClient client = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential(_emailSettings.SmtpUser, _emailSettings.SmtpPass);
                client.EnableSsl = false;

                try
                {
                    await client.SendMailAsync(message);
                }
                catch (Exception ex)
                {
                    throw new Exception("Erro ao enviar o email: " + ex.Message);
                }
            }
        }
    }
}
