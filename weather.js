#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import {printError, printHelp, printSuccess, printWeather} from "./services/log.services.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storare.service.js";
import {getIconWeather, getWeather} from "./services/api.services.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Токен не передан')
        return
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранён')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Город не передан')
        return
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранён')
    } catch (e) {
        printError(e.message)
    }
}

const ERROR_MESSAGES = {
    api: {
        401: 'Неверно указан город',
        404: 'Неверно указан токен'
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY || await getKeyValue(TOKEN_DICTIONARY.city) || 'minsk'
        const weather = await getWeather(city)
        const icon = getIconWeather(weather.weather[0].icon)
        printWeather(weather, icon)
    } catch (e) {
        const err = ERROR_MESSAGES.api[e?.response?.status] || e.message
        printError(err)
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        // HELP
        printHelp()
    }

    if (args.s) {
        return saveCity(args.s)
        // SAVE CITY
    }

    if (args.t) {
        // SAVE TOKEN
        return saveToken(args.t)
    }

    // SHOW WEATHER
    getForecast()
}

initCLI()