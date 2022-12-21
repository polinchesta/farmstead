import React, { Fragment } from "react";
import { IntlProvider, } from "react-intl";
import { LOCALES } from "./locales";

interface ReactElement {
    children: any
    locale:any
}

const Provider = ({children, locale}: ReactElement) => (
 <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages=""
    >
    {children}
    </IntlProvider>
)