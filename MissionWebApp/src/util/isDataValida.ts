import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const isDataValida = (umaData: string) => {
    let dateArray = umaData.split("/");
    let novaData: string = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

    return dayjs(novaData, "YYYY-MM-DD", true).isValid();
}

export default isDataValida;