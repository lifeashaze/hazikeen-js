const { EmbedBuilder } = require("discord.js");
const { fetchData} = require("../../helpers/dataUtils");
const { calculateTimeRemaining } = require("../../helpers/timeUtils");

module.exports = async (message, client) => {

  if (message.content === "=itdsl") {
    const assignments = await fetchData("ITDSL")
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("ITDSL Assignments")

      try {
        assignments.forEach((assignment) => {
          const timeRemaining = calculateTimeRemaining(assignment.dueDate);
          embed.addFields({
            name: `${assignment.title}`,
            value: `Due Date: ${assignment.dueDate} [${timeRemaining}]`,
          });
        });


      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching data:", error);
      message.channel.send("Error fetching assignments.");
    }
  }
};
