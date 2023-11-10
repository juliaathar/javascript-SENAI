export const dateFormatDbToView = date => {

    date = date.substr(0,10);

    date = date.split("-")

    return `${date[2]}/${date[1]}/${date[0]}`;
}
