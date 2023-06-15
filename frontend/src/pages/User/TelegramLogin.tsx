import React from 'react';
import TelegramLoginButton, { TelegramUser } from '@v9v/ts-react-telegram-login';

function Telegram() {
    const onTelegramAuth = (user: TelegramUser) => {
      alert(
        `Logged in as ${user.first_name} ${user.last_name} (${user.id}${user ? `, @${user}` : ''})`
      );
    };
  
    return (
      <div>
        <TelegramLoginButton 
            dataOnAuth={onTelegramAuth}
            botName="MaikAgrobusiness_bot"
            buttonSize="large"
            requestAccess={true}
        />
      </div>
    );
  }
  
  export default Telegram;
  