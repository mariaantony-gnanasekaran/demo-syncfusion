/* */ 
"format cjs";
(function(process) {
  (function(factory) {
    if (typeof define === "function" && define.amd) {
      define(["jquery", "./jquery.validate"], factory);
    } else if (typeof module === "object" && module.exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(jQuery);
    }
  }(function($) {
    (function() {
      function stripHtml(value) {
        return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
      }
      $.validator.addMethod("maxWords", function(value, element, params) {
        return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length <= params;
      }, $.validator.format("Please enter {0} words or less."));
      $.validator.addMethod("minWords", function(value, element, params) {
        return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
      }, $.validator.format("Please enter at least {0} words."));
      $.validator.addMethod("rangeWords", function(value, element, params) {
        var valueStripped = stripHtml(value),
            regex = /\b\w+\b/g;
        return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1];
      }, $.validator.format("Please enter between {0} and {1} words."));
    }());
    $.validator.addMethod("accept", function(value, element, param) {
      var typeParam = typeof param === "string" ? param.replace(/\s/g, "") : "image/*",
          optionalValue = this.optional(element),
          i,
          file,
          regex;
      if (optionalValue) {
        return optionalValue;
      }
      if ($(element).attr("type") === "file") {
        typeParam = typeParam.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&").replace(/,/g, "|").replace(/\/\*/g, "/.*");
        if (element.files && element.files.length) {
          regex = new RegExp(".?(" + typeParam + ")$", "i");
          for (i = 0; i < element.files.length; i++) {
            file = element.files[i];
            if (!file.type.match(regex)) {
              return false;
            }
          }
        }
      }
      return true;
    }, $.validator.format("Please enter a value with a valid mimetype."));
    $.validator.addMethod("alphanumeric", function(value, element) {
      return this.optional(element) || /^\w+$/i.test(value);
    }, "Letters, numbers, and underscores only please");
    $.validator.addMethod("bankaccountNL", function(value, element) {
      if (this.optional(element)) {
        return true;
      }
      if (!(/^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test(value))) {
        return false;
      }
      var account = value.replace(/ /g, ""),
          sum = 0,
          len = account.length,
          pos,
          factor,
          digit;
      for (pos = 0; pos < len; pos++) {
        factor = len - pos;
        digit = account.substring(pos, pos + 1);
        sum = sum + factor * digit;
      }
      return sum % 11 === 0;
    }, "Please specify a valid bank account number");
    $.validator.addMethod("bankorgiroaccountNL", function(value, element) {
      return this.optional(element) || ($.validator.methods.bankaccountNL.call(this, value, element)) || ($.validator.methods.giroaccountNL.call(this, value, element));
    }, "Please specify a valid bank or giro account number");
    $.validator.addMethod("bic", function(value, element) {
      return this.optional(element) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(value.toUpperCase());
    }, "Please specify a valid BIC code");
    $.validator.addMethod("cifES", function(value) {
      "use strict";
      var num = [],
          controlDigit,
          sum,
          i,
          count,
          tmp,
          secondDigit;
      value = value.toUpperCase();
      if (!value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) {
        return false;
      }
      for (i = 0; i < 9; i++) {
        num[i] = parseInt(value.charAt(i), 10);
      }
      sum = num[2] + num[4] + num[6];
      for (count = 1; count < 8; count += 2) {
        tmp = (2 * num[count]).toString();
        secondDigit = tmp.charAt(1);
        sum += parseInt(tmp.charAt(0), 10) + (secondDigit === "" ? 0 : parseInt(secondDigit, 10));
      }
      if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(value)) {
        sum += "";
        controlDigit = 10 - parseInt(sum.charAt(sum.length - 1), 10);
        value += controlDigit;
        return (num[8].toString() === String.fromCharCode(64 + controlDigit) || num[8].toString() === value.charAt(value.length - 1));
      }
      return false;
    }, "Please specify a valid CIF number.");
    $.validator.addMethod("cpfBR", function(value) {
      value = value.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "");
      if (value.length !== 11) {
        return false;
      }
      var sum = 0,
          firstCN,
          secondCN,
          checkResult,
          i;
      firstCN = parseInt(value.substring(9, 10), 10);
      secondCN = parseInt(value.substring(10, 11), 10);
      checkResult = function(sum, cn) {
        var result = (sum * 10) % 11;
        if ((result === 10) || (result === 11)) {
          result = 0;
        }
        return (result === cn);
      };
      if (value === "" || value === "00000000000" || value === "11111111111" || value === "22222222222" || value === "33333333333" || value === "44444444444" || value === "55555555555" || value === "66666666666" || value === "77777777777" || value === "88888888888" || value === "99999999999") {
        return false;
      }
      for (i = 1; i <= 9; i++) {
        sum = sum + parseInt(value.substring(i - 1, i), 10) * (11 - i);
      }
      if (checkResult(sum, firstCN)) {
        sum = 0;
        for (i = 1; i <= 10; i++) {
          sum = sum + parseInt(value.substring(i - 1, i), 10) * (12 - i);
        }
        return checkResult(sum, secondCN);
      }
      return false;
    }, "Please specify a valid CPF number");
    $.validator.addMethod("creditcard", function(value, element) {
      if (this.optional(element)) {
        return "dependency-mismatch";
      }
      if (/[^0-9 \-]+/.test(value)) {
        return false;
      }
      var nCheck = 0,
          nDigit = 0,
          bEven = false,
          n,
          cDigit;
      value = value.replace(/\D/g, "");
      if (value.length < 13 || value.length > 19) {
        return false;
      }
      for (n = value.length - 1; n >= 0; n--) {
        cDigit = value.charAt(n);
        nDigit = parseInt(cDigit, 10);
        if (bEven) {
          if ((nDigit *= 2) > 9) {
            nDigit -= 9;
          }
        }
        nCheck += nDigit;
        bEven = !bEven;
      }
      return (nCheck % 10) === 0;
    }, "Please enter a valid credit card number.");
    $.validator.addMethod("creditcardtypes", function(value, element, param) {
      if (/[^0-9\-]+/.test(value)) {
        return false;
      }
      value = value.replace(/\D/g, "");
      var validTypes = 0x0000;
      if (param.mastercard) {
        validTypes |= 0x0001;
      }
      if (param.visa) {
        validTypes |= 0x0002;
      }
      if (param.amex) {
        validTypes |= 0x0004;
      }
      if (param.dinersclub) {
        validTypes |= 0x0008;
      }
      if (param.enroute) {
        validTypes |= 0x0010;
      }
      if (param.discover) {
        validTypes |= 0x0020;
      }
      if (param.jcb) {
        validTypes |= 0x0040;
      }
      if (param.unknown) {
        validTypes |= 0x0080;
      }
      if (param.all) {
        validTypes = 0x0001 | 0x0002 | 0x0004 | 0x0008 | 0x0010 | 0x0020 | 0x0040 | 0x0080;
      }
      if (validTypes & 0x0001 && /^(5[12345])/.test(value)) {
        return value.length === 16;
      }
      if (validTypes & 0x0002 && /^(4)/.test(value)) {
        return value.length === 16;
      }
      if (validTypes & 0x0004 && /^(3[47])/.test(value)) {
        return value.length === 15;
      }
      if (validTypes & 0x0008 && /^(3(0[012345]|[68]))/.test(value)) {
        return value.length === 14;
      }
      if (validTypes & 0x0010 && /^(2(014|149))/.test(value)) {
        return value.length === 15;
      }
      if (validTypes & 0x0020 && /^(6011)/.test(value)) {
        return value.length === 16;
      }
      if (validTypes & 0x0040 && /^(3)/.test(value)) {
        return value.length === 16;
      }
      if (validTypes & 0x0040 && /^(2131|1800)/.test(value)) {
        return value.length === 15;
      }
      if (validTypes & 0x0080) {
        return true;
      }
      return false;
    }, "Please enter a valid credit card number.");
    $.validator.addMethod("currency", function(value, element, param) {
      var isParamString = typeof param === "string",
          symbol = isParamString ? param : param[0],
          soft = isParamString ? true : param[1],
          regex;
      symbol = symbol.replace(/,/g, "");
      symbol = soft ? symbol + "]" : symbol + "]?";
      regex = "^[" + symbol + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$";
      regex = new RegExp(regex);
      return this.optional(element) || regex.test(value);
    }, "Please specify a valid currency");
    $.validator.addMethod("dateFA", function(value, element) {
      return this.optional(element) || /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/.test(value);
    }, $.validator.messages.date);
    $.validator.addMethod("dateITA", function(value, element) {
      var check = false,
          re = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
          adata,
          gg,
          mm,
          aaaa,
          xdata;
      if (re.test(value)) {
        adata = value.split("/");
        gg = parseInt(adata[0], 10);
        mm = parseInt(adata[1], 10);
        aaaa = parseInt(adata[2], 10);
        xdata = new Date(Date.UTC(aaaa, mm - 1, gg, 12, 0, 0, 0));
        if ((xdata.getUTCFullYear() === aaaa) && (xdata.getUTCMonth() === mm - 1) && (xdata.getUTCDate() === gg)) {
          check = true;
        } else {
          check = false;
        }
      } else {
        check = false;
      }
      return this.optional(element) || check;
    }, $.validator.messages.date);
    $.validator.addMethod("dateNL", function(value, element) {
      return this.optional(element) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(value);
    }, $.validator.messages.date);
    $.validator.addMethod("extension", function(value, element, param) {
      param = typeof param === "string" ? param.replace(/,/g, "|") : "png|jpe?g|gif";
      return this.optional(element) || value.match(new RegExp("\\.(" + param + ")$", "i"));
    }, $.validator.format("Please enter a value with a valid extension."));
    $.validator.addMethod("giroaccountNL", function(value, element) {
      return this.optional(element) || /^[0-9]{1,7}$/.test(value);
    }, "Please specify a valid giro account number");
    $.validator.addMethod("iban", function(value, element) {
      if (this.optional(element)) {
        return true;
      }
      var iban = value.replace(/ /g, "").toUpperCase(),
          ibancheckdigits = "",
          leadingZeroes = true,
          cRest = "",
          cOperator = "",
          countrycode,
          ibancheck,
          charAt,
          cChar,
          bbanpattern,
          bbancountrypatterns,
          ibanregexp,
          i,
          p;
      var minimalIBANlength = 5;
      if (iban.length < minimalIBANlength) {
        return false;
      }
      countrycode = iban.substring(0, 2);
      bbancountrypatterns = {
        "AL": "\\d{8}[\\dA-Z]{16}",
        "AD": "\\d{8}[\\dA-Z]{12}",
        "AT": "\\d{16}",
        "AZ": "[\\dA-Z]{4}\\d{20}",
        "BE": "\\d{12}",
        "BH": "[A-Z]{4}[\\dA-Z]{14}",
        "BA": "\\d{16}",
        "BR": "\\d{23}[A-Z][\\dA-Z]",
        "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
        "CR": "\\d{17}",
        "HR": "\\d{17}",
        "CY": "\\d{8}[\\dA-Z]{16}",
        "CZ": "\\d{20}",
        "DK": "\\d{14}",
        "DO": "[A-Z]{4}\\d{20}",
        "EE": "\\d{16}",
        "FO": "\\d{14}",
        "FI": "\\d{14}",
        "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "GE": "[\\dA-Z]{2}\\d{16}",
        "DE": "\\d{18}",
        "GI": "[A-Z]{4}[\\dA-Z]{15}",
        "GR": "\\d{7}[\\dA-Z]{16}",
        "GL": "\\d{14}",
        "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
        "HU": "\\d{24}",
        "IS": "\\d{22}",
        "IE": "[\\dA-Z]{4}\\d{14}",
        "IL": "\\d{19}",
        "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "KZ": "\\d{3}[\\dA-Z]{13}",
        "KW": "[A-Z]{4}[\\dA-Z]{22}",
        "LV": "[A-Z]{4}[\\dA-Z]{13}",
        "LB": "\\d{4}[\\dA-Z]{20}",
        "LI": "\\d{5}[\\dA-Z]{12}",
        "LT": "\\d{16}",
        "LU": "\\d{3}[\\dA-Z]{13}",
        "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
        "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
        "MR": "\\d{23}",
        "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
        "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "MD": "[\\dA-Z]{2}\\d{18}",
        "ME": "\\d{18}",
        "NL": "[A-Z]{4}\\d{10}",
        "NO": "\\d{11}",
        "PK": "[\\dA-Z]{4}\\d{16}",
        "PS": "[\\dA-Z]{4}\\d{21}",
        "PL": "\\d{24}",
        "PT": "\\d{21}",
        "RO": "[A-Z]{4}[\\dA-Z]{16}",
        "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "SA": "\\d{2}[\\dA-Z]{18}",
        "RS": "\\d{18}",
        "SK": "\\d{20}",
        "SI": "\\d{15}",
        "ES": "\\d{20}",
        "SE": "\\d{20}",
        "CH": "\\d{5}[\\dA-Z]{12}",
        "TN": "\\d{20}",
        "TR": "\\d{5}[\\dA-Z]{17}",
        "AE": "\\d{3}\\d{16}",
        "GB": "[A-Z]{4}\\d{14}",
        "VG": "[\\dA-Z]{4}\\d{16}"
      };
      bbanpattern = bbancountrypatterns[countrycode];
      if (typeof bbanpattern !== "undefined") {
        ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
        if (!(ibanregexp.test(iban))) {
          return false;
        }
      }
      ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
      for (i = 0; i < ibancheck.length; i++) {
        charAt = ibancheck.charAt(i);
        if (charAt !== "0") {
          leadingZeroes = false;
        }
        if (!leadingZeroes) {
          ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
        }
      }
      for (p = 0; p < ibancheckdigits.length; p++) {
        cChar = ibancheckdigits.charAt(p);
        cOperator = "" + cRest + "" + cChar;
        cRest = cOperator % 97;
      }
      return cRest === 1;
    }, "Please specify a valid IBAN");
    $.validator.addMethod("integer", function(value, element) {
      return this.optional(element) || /^-?\d+$/.test(value);
    }, "A positive or negative non-decimal number please");
    $.validator.addMethod("ipv4", function(value, element) {
      return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
    }, "Please enter a valid IP v4 address.");
    $.validator.addMethod("ipv6", function(value, element) {
      return this.optional(element) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);
    }, "Please enter a valid IP v6 address.");
    $.validator.addMethod("lettersonly", function(value, element) {
      return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only please");
    $.validator.addMethod("letterswithbasicpunc", function(value, element) {
      return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value);
    }, "Letters or punctuation only please");
    $.validator.addMethod("mobileNL", function(value, element) {
      return this.optional(element) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(value);
    }, "Please specify a valid mobile number");
    $.validator.addMethod("mobileUK", function(phone_number, element) {
      phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
      return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/);
    }, "Please specify a valid mobile number");
    $.validator.addMethod("nieES", function(value) {
      "use strict";
      value = value.toUpperCase();
      if (!value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) {
        return false;
      }
      if (/^[T]{1}/.test(value)) {
        return (value[8] === /^[T]{1}[A-Z0-9]{8}$/.test(value));
      }
      if (/^[XYZ]{1}/.test(value)) {
        return (value[8] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.replace("X", "0").replace("Y", "1").replace("Z", "2").substring(0, 8) % 23));
      }
      return false;
    }, "Please specify a valid NIE number.");
    $.validator.addMethod("nifES", function(value) {
      "use strict";
      value = value.toUpperCase();
      if (!value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) {
        return false;
      }
      if (/^[0-9]{8}[A-Z]{1}$/.test(value)) {
        return ("TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.substring(8, 0) % 23) === value.charAt(8));
      }
      if (/^[KLM]{1}/.test(value)) {
        return (value[8] === String.fromCharCode(64));
      }
      return false;
    }, "Please specify a valid NIF number.");
    $.validator.addMethod("notEqualTo", function(value, element, param) {
      return this.optional(element) || !$.validator.methods.equalTo.call(this, value, element, param);
    }, "Please enter a different value, values must not be the same.");
    $.validator.addMethod("nowhitespace", function(value, element) {
      return this.optional(element) || /^\S+$/i.test(value);
    }, "No white space please");
    $.validator.addMethod("pattern", function(value, element, param) {
      if (this.optional(element)) {
        return true;
      }
      if (typeof param === "string") {
        param = new RegExp("^(?:" + param + ")$");
      }
      return param.test(value);
    }, "Invalid format.");
    $.validator.addMethod("phoneNL", function(value, element) {
      return this.optional(element) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(value);
    }, "Please specify a valid phone number.");
    $.validator.addMethod("phoneUK", function(phone_number, element) {
      phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
      return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/);
    }, "Please specify a valid phone number");
    $.validator.addMethod("phoneUS", function(phone_number, element) {
      phone_number = phone_number.replace(/\s+/g, "");
      return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
    }, "Please specify a valid phone number");
    $.validator.addMethod("phonesUK", function(phone_number, element) {
      phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
      return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/);
    }, "Please specify a valid uk phone number");
    $.validator.addMethod("postalCodeCA", function(value, element) {
      return this.optional(element) || /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] *\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(value);
    }, "Please specify a valid postal code");
    $.validator.addMethod("postalcodeBR", function(cep_value, element) {
      return this.optional(element) || /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(cep_value);
    }, "Informe um CEP válido.");
    $.validator.addMethod("postalcodeIT", function(value, element) {
      return this.optional(element) || /^\d{5}$/.test(value);
    }, "Please specify a valid postal code");
    $.validator.addMethod("postalcodeNL", function(value, element) {
      return this.optional(element) || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(value);
    }, "Please specify a valid postal code");
    $.validator.addMethod("postcodeUK", function(value, element) {
      return this.optional(element) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(value);
    }, "Please specify a valid UK postcode");
    $.validator.addMethod("require_from_group", function(value, element, options) {
      var $fields = $(options[1], element.form),
          $fieldsFirst = $fields.eq(0),
          validator = $fieldsFirst.data("valid_req_grp") ? $fieldsFirst.data("valid_req_grp") : $.extend({}, this),
          isValid = $fields.filter(function() {
            return validator.elementValue(this);
          }).length >= options[0];
      $fieldsFirst.data("valid_req_grp", validator);
      if (!$(element).data("being_validated")) {
        $fields.data("being_validated", true);
        $fields.each(function() {
          validator.element(this);
        });
        $fields.data("being_validated", false);
      }
      return isValid;
    }, $.validator.format("Please fill at least {0} of these fields."));
    $.validator.addMethod("skip_or_fill_minimum", function(value, element, options) {
      var $fields = $(options[1], element.form),
          $fieldsFirst = $fields.eq(0),
          validator = $fieldsFirst.data("valid_skip") ? $fieldsFirst.data("valid_skip") : $.extend({}, this),
          numberFilled = $fields.filter(function() {
            return validator.elementValue(this);
          }).length,
          isValid = numberFilled === 0 || numberFilled >= options[0];
      $fieldsFirst.data("valid_skip", validator);
      if (!$(element).data("being_validated")) {
        $fields.data("being_validated", true);
        $fields.each(function() {
          validator.element(this);
        });
        $fields.data("being_validated", false);
      }
      return isValid;
    }, $.validator.format("Please either skip these fields or fill at least {0} of them."));
    $.validator.addMethod("stateUS", function(value, element, options) {
      var isDefault = typeof options === "undefined",
          caseSensitive = (isDefault || typeof options.caseSensitive === "undefined") ? false : options.caseSensitive,
          includeTerritories = (isDefault || typeof options.includeTerritories === "undefined") ? false : options.includeTerritories,
          includeMilitary = (isDefault || typeof options.includeMilitary === "undefined") ? false : options.includeMilitary,
          regex;
      if (!includeTerritories && !includeMilitary) {
        regex = "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
      } else if (includeTerritories && includeMilitary) {
        regex = "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
      } else if (includeTerritories) {
        regex = "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
      } else {
        regex = "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
      }
      regex = caseSensitive ? new RegExp(regex) : new RegExp(regex, "i");
      return this.optional(element) || regex.test(value);
    }, "Please specify a valid state");
    $.validator.addMethod("strippedminlength", function(value, element, param) {
      return $(value).text().length >= param;
    }, $.validator.format("Please enter at least {0} characters"));
    $.validator.addMethod("time", function(value, element) {
      return this.optional(element) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test(value);
    }, "Please enter a valid time, between 00:00 and 23:59");
    $.validator.addMethod("time12h", function(value, element) {
      return this.optional(element) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(value);
    }, "Please enter a valid time in 12-hour am/pm format");
    $.validator.addMethod("url2", function(value, element) {
      return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }, $.validator.messages.url);
    $.validator.addMethod("vinUS", function(v) {
      if (v.length !== 17) {
        return false;
      }
      var LL = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
          VL = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9],
          FL = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2],
          rs = 0,
          i,
          n,
          d,
          f,
          cd,
          cdv;
      for (i = 0; i < 17; i++) {
        f = FL[i];
        d = v.slice(i, i + 1);
        if (i === 8) {
          cdv = d;
        }
        if (!isNaN(d)) {
          d *= f;
        } else {
          for (n = 0; n < LL.length; n++) {
            if (d.toUpperCase() === LL[n]) {
              d = VL[n];
              d *= f;
              if (isNaN(cdv) && n === 8) {
                cdv = LL[n];
              }
              break;
            }
          }
        }
        rs += d;
      }
      cd = rs % 11;
      if (cd === 10) {
        cd = "X";
      }
      if (cd === cdv) {
        return true;
      }
      return false;
    }, "The specified vehicle identification number (VIN) is invalid.");
    $.validator.addMethod("zipcodeUS", function(value, element) {
      return this.optional(element) || /^\d{5}(-\d{4})?$/.test(value);
    }, "The specified US ZIP Code is invalid");
    $.validator.addMethod("ziprange", function(value, element) {
      return this.optional(element) || /^90[2-5]\d\{2\}-\d{4}$/.test(value);
    }, "Your ZIP-code must be in the range 902xx-xxxx to 905xx-xxxx");
  }));
})(require("process"));
