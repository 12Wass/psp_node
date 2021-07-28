export function isMobile() {
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }

  // Round and format the price in order to display a regular price every time
  export function price(num) {
    num = formatedPrice(round2(num));
    var parts = num.toString().split(",");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(",");
}

// Formated price like 1 000,00
function formatedPrice(price) {
  price = price.toString().replace('.', ',');
  var hasComma = price.toString().indexOf(',');
  if (hasComma > -1) {
    /* there are som decimal */
    var arr = price.split(',');
    if (arr[1].length < 2) {
      price += "0";
    }
  }else {
    price += ",00";
  }

  return price
}

// Round a number
export function round2( number ) {
  return Math.round(number * 100) / 100;
}

//
export function formatCreditCard(value) {
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let matches = v.match(/\d{4,16}/g);
  let match = matches && matches[0] || ''
  let parts = []

  for (let i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
  }

  if (parts.length) {
      return parts.join(' ')
  } else {
      return value
  }
}

export function formatExpiryDate(exp) {
  return exp.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^1([3-9])$/g, '01/$1' // 13 > 01/3 //UPDATED by NAVNEET
  // ).replace(
  //   /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^0\/|0+$/g, '0' // 0/ > 0 and 00 > 0 //UPDATED by NAVNEET
  ).replace(
    /[^\d|^\/]*/g, '' // To allow only digits and `/` //UPDATED by NAVNEET
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );
} 