import chalk from 'chalk'
import dedent from "dedent-js";

export const printError = (error) => {
    console.log(chalk.bgRed('ERROR'), error)
}

export const printSuccess = (msg) => {
    console.log(chalk.bgGreen('SUCCESS'), msg)
}

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan('HELP')}
        Без параметров -- вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        `
    )
}

export const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgBlueBright('WEATHER')} in ${res.name}
        ${icon} ${res.weather[0].description}
        temp: ${res.main.temp} (feels like: ${res.main.feels_like})
        humidity: ${res.main.humidity}
        wind speed: ${res.wind.speed} м/с
        `
    )
}


