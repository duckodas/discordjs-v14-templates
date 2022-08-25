const {
  ChatInputCommandInteraction,
  TextInputStyle,
} = require("discord.js");
const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  SlashCommandBuilder,
} = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`user`)
    .setDescription(`Welcome yourself by providing information about yourself!`),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const fields = {
      randominfo: new TextInputBuilder()
        .setCustomId(`random-info`)
        .setLabel(`What you want to say?`)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(2)
        .setMinLength(1)
        .setPlaceholder(`I hate cats`),
    };

    const modal = new ModalBuilder()
      .setCustomId(`not-required-for-this`)
      .setTitle(`Provide some information about yourself!`)
      .setComponents(
        new ActionRowBuilder().setComponents(fields.randominfo)
      );

    await interaction.showModal(modal);

    const submitted = await interaction
      .awaitModalSubmit({
        time: 60000,
        filter: (i) => i.user.id === interaction.user.id,
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
    if (submitted) {
      const randominfo = submitted.fields.getTextInputValue("random-info");
      await submitted.reply({
        content: `${randominfo} <3`,
      });
    }
  },
};
