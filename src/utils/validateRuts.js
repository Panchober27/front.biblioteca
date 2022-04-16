function validateRut(rut) {
  try {
    let idCard;
    for (let c of rut) {
      if (c === "-") {
        idCard = rut.replace("-", "");
      }
      if (c === ".") {
        idCard = rut.replace(".", "");
      }
    }

    let idCardUser = idCard;

    if (idCardUser) {
      let idCardUserTemp = idCardUser;
      let body = idCardUserTemp.slice(0, -1);
      let dv = idCardUserTemp.slice(-1).toUpperCase();
      let result = 0;
      let multiple = 2;
      if (body.length < 7) {
        return false;
      }
      for (var i = 1; i <= idCardUser.length; i++) {
        let index = multiple * idCardUserTemp.charAt(body.length - i);
        result = result + index;
        multiple < 7 ? (multiple = multiple + 1) : (multiple = 2);
      }
      let checkDigit = 11 - (result % 11);
      dv = dv == "K" ? 10 : dv;
      dv = dv == 0 ? 11 : dv;

      if (checkDigit == dv) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default validateRut;
