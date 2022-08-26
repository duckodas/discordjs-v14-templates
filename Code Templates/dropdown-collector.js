const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  SlashCommandBuilder,
  ComponentType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`dropdown`)
    .setDescription(`Gives a dropdown menu where you can select some options`),
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("Select your option")
        .addOptions([
          {
            label: "THis is selection 1",
            description: "CLick here to see option 1!",
            value: "first",
          },
          {
            label: "THis is selection 2",
            description: "CLick here to see option 2!",
            value: "second",
          },
          {
            label: "THis is selection 3",
            description: "CLick here to see option 3!",
            value: "third",
          },
        ])
    );

    const embed = new EmbedBuilder().setDescription(
      "Choose the option you want to select"
    );

    interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

    const embed1 = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Hello`);

    const embed2 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`Hello`);

    const embed3 = new EmbedBuilder()
      .setColor("Blurple")
      .setDescription(`Hello`);

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.SelectMenu,
      time: 15000,
    });

    collector.on("collect", async (collected) => {
      const value = collected.values[0];

      if (value === "first") {
        collected.reply({ embeds: [embed1], ephemeral: true });
      }

      if (value === "second") {
        collected.reply({ embeds: [embed2], ephemeral: true });
      }

      if (value === "third") {
        collected.reply({ embeds: [embed3], ephemeral: true });
      }
    });
  },
};
