from telegram_bot import Telegram_Bot, command, inline, inline_callback, chosen_inline, checked
import datetime, json, subprocess

token = '222169459:AAEnBZOVttWQMUGGZyAdQaGB1H5leWIxZuY'  # Bot API token here

bot = Telegram_Bot(token)
send = bot.sender

@command.define('/gitpull')
def pull(message):
    try:
        output = subprocess.check_output("git pull", shell=True)
    except Exception as e:
        output = e
    send.message_reply(message.chat_id, output, message.message_id)
if __name__ == '__main__':
    bot.run()
