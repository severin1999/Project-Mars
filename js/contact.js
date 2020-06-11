const sendEmail = () => {
    function returnData(id) {
        return document.getElementById(`${id}`).value;
    };

    Email.send({
        Host: 'smtp.gmail.com',
        Username: returnData('username_mail'),
        Password: returnData('username_password'),
        To: returnData('recipient'),
        From: returnData('username_mail'),
        Subject: returnData('mail_subject'),
        Body: `From ${returnData('f_name')} ${returnData('l_name')}, ${returnData('countryId')} ${returnData('stateId')} ${returnData('cityId')}.
        ${returnData('mail_body')}`
    }).then(message => alert(message));
};

document.getElementById('form_submit').addEventListener('click', sendEmail);