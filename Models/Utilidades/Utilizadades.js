module.exports = class Utilizadades {

    constructor() { }

    Console(msg) {
        console.log(msg);
    }

    Data() {

        let date = new Date();

        let info = {
            
            minuto: date.getMinutes(),
            hora: date.getHours() - 3, // para host no EUA
            dia: date.getDate(),
            mes: date.getMonth() + 1,
            ano: date.getUTCFullYear()
        }

        return info;
    }

}