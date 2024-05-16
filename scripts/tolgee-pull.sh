# install Tolgee cli
npm i -g @tolgee/cli

# login to tolgee platform
tolgee login $TOLGEE_ACCESS_TOKEN

# pull translation files to ./i18n folder
tolgee --project-id 7020 pull ./public/i18n