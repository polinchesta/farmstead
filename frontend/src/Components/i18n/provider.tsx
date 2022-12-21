import React, { Fragment } from "react";
import { IntlProvider, } from "react-intl";
import { LOCALES } from "./locales";
import messages from "./messages";

interface ReactElement {
    children: any
    locale:any
}

const Provider = ({children, locale = LOCALES.RUSSIAN}: ReactElement) => (
 <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={messages[locale]}
    >
    {children}
    </IntlProvider>
)

export default Provider