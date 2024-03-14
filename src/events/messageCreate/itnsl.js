const { EmbedBuilder, time } = require("discord.js");
const { fetchData} = require("../../helpers/dataUtils");
const { calculateTimeRemaining } = require("../../helpers/timeUtils");

module.exports = async (message, client) => {

  if (message.content === "=itnsl") {
    const assignments = await fetchData()
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("ITNSL Assignments");

    try {
      assignments.forEach((assignment) => {
        const timeRemaining = calculateTimeRemaining(assignment.dueDate);
        embed.addFields({
          name: `${assignment.title}`,
          value: `Due Date: ${assignment.dueDate} [${timeRemaining}]`,
        });
      });


      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching data:", error);
      message.channel.send("Error fetching assignments.");
    }
  }
};


