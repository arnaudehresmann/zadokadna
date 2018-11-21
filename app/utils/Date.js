export function toZadokaDate(date) {
    return date.getFullYear().toString() 
        + ("0"+(date.getMonth()+1)).slice(-2) 
        + ("0" + date.getDate()).slice(-2);
}

export function toHeaderDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options)
}

export function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function incDays(date) {
    return addDays(date, 1);
}

export function decDays(date) {
    return addDays(date, -1);
}