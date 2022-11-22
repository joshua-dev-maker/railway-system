exports.signupTemplate = async (token) => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: 0;
      }
    </style>
  </head>
  <body style="width: 100%; margin: 0 auto; text-align: center">
    <main
      style="max-width: 90%; width: 500px; padding: 3rem 1rem; margin: 0 auto"
    >
      <div style="display: flex; align-items: center; justify-content: center">
        <img
          src="https://res.cloudinary.com/dje0odmhg/image/upload/v1653482116/Coinskash_nsdfvy.png"
          alt="CoinsKash Logo"
          style="margin-right: 10px"
        />
        <h2
          style="
            color: #191f2b;
            font-size: 24px;
            font-family: 'Poppins', sans-serif;
          "
        >
          CoinsKash
        </h2>
      </div>
      <p
        style="
          margin-top: 16px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
        "
      >
        This is an automated email, please do not reply.
      </p>
      <div style="margin: 30px 0">
        <img
          src="https://res.cloudinary.com/dje0odmhg/image/upload/v1653482174/mail_omyrg4.png"
          alt="Mail"
        />
      </div>
      <div>
        <h2
          style="
            color: #191f2b;
            font-size: 24px;
            font-family: 'Poppins', sans-serif;
          "
        >
          Welcome to CoinsKash
        </h2>
        <p
          style="
            color: #9e9e9e;
            font-size: 13px;
            font-family: 'Poppins', sans-serif;
            line-height: 19.2px;
            margin: 30px 0;
          "
        >
          Thank you for joining the coinskash platform. We are delighted to have
          you with us !
        </p>
        <p
          style="
            color: #191f2b;
            font-size: 13px;
            font-family: 'Poppins', sans-serif;
            line-height: 19.2px;
            width: 85%;
            margin: 0 auto;
          "
        >
          Kindly complete your registration by verifying your email below (valid
          for 2 hours)
        </p>
      </div>
      <div>
        <a
          href=http://localhost:0901/auth/verifyemail?token=${token}
          style="
            display: block;
            width: 40%;
            margin: 30px auto 0 auto;
            font-family: 'Poppins', sans-serif;
            background: #604aed;
            border-radius: 8px;
            padding: 15px 0;
            border: none;
            font-size: 14px;
            color: #fff;
            text-decoration: none;
            margin-top: 30px;
          "
          >Verify Email</a
        >
        <p
          style="
            color: #191f2b;
            font-size: 13px;
            font-family: 'Poppins', sans-serif;
            margin: 30px 0;
          "
        >
          Please do not delete this email.
        </p>
      </div>
      <div>
        <h3 style="color: #191f2b; font-family: 'Poppins', sans-serif">
          Addresses
        </h3>
        <p
          style="
            color: #9e9e9e;
            font-size: 16px;
            font-family: 'Poppins', sans-serif;
            width: 75%;
            line-height: 25px;
            margin: 30px auto;
          "
        >
          Grazac Innovation Hub, Salawu Olabode Avenue, Ewang Road, Idi-aba,
          Abeokuta
        </p>
      </div>
      <footer
        style="
          width: 50%;
          display: flex;
          margin: 0 auto;
          justify-content: space-between;
        "
      >
        <a
          style="
            color: #191f2b;
            font-size: 12px;
            font-family: 'Poppins', sans-serif;
            text-decoration: none;
          "
          href="www.coinkash.com"
          >www.coinkash.com</a
        >
        <a
          style="
            color: #191f2b;
            font-size: 12px;
            font-family: 'Poppins', sans-serif;
            text-decoration: none;
          "
          href=""
          >LinkedIn</a
        >
      </footer>
    </main>
  </body>
</html>`;
  return html;
};
