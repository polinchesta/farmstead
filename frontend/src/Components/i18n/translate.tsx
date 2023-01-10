import React from "react";
import {FormattedMessage} from 'react-intl';

const translate = (id:any, value = {}) => <FormattedMessage id={id} values={{...value}} />

export default translate;