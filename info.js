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
      age: new TextInputBuilder()
        .setCustomId(`age`)
        .setLabel(`What is your age?`)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(2)
        .setMinLength(1)
        .setPlaceholder(`90 years young`),
      name: new TextInputBuilder()
        .setCustomId(`name`)
        .setLabel(`What is your name?`)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(40)
        .setMinLength(2)
        .setPlaceholder(`John Doe`),
      hobby: new TextInputBuilder()
        .setCustomId(`hobby`)
        .setLabel(`What is your hobby?`)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(250)
        .setMinLength(10)
        .setPlaceholder(`I play football and games!`),
    };

    const modal = new ModalBuilder()
      .setCustomId(`not-required-for-this`)
      .setTitle(`Provide some information about yourself!`)
      .setComponents(
        new ActionRowBuilder().setComponents(fields.age),
        new ActionRowBuilder().setComponents(fields.name),
        new ActionRowBuilder().setComponents(fields.hobby)
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
      const age = submitted.fields.getTextInputValue("age");
      const name = submitted.fields.getTextInputValue("name");
      const hobby = submitted.fields.getTextInputValue("hobby");
      await submitted.reply({
        content: `Hello i am **${name}**, I am **${age}** years old! Other information about me - **${hobby}**`,
      });
    }
  },
};
