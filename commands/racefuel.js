module.exports = {
	name: 'racefuel',
	description: 'Calculates race fuel for a race of a certain length in minutes.',
	execute(message, args) {
		// if the user wants help with the racefuel command structure, run this code.
		if(args[0] == 'help') {
			message.channel.send('Usage: ```!racefuel [race time in minutes] [lap time in minutes:seconds.milliseconds] [fuel per lap]. If there are no milliseconds, i.e. the lap time is 1:45.000, include the 0s```');
		}
		// otherwise, try doing the calculations for fuel. this is in a try/catch block,
		else {
			try {
				const raceTimeSeconds = parseFloat(args[0]) * 60;
				const lapTimeSeconds = (parseFloat(args[1].split(':').shift()) * 60) + parseFloat(args[1].split(':').pop());
				const totalLaps = raceTimeSeconds / lapTimeSeconds;
				const fuelEstimate = totalLaps * args[2] + 1;
				// this line is a goof because paul never leaves 2nd gear - add 10 litres to whatever calculation we come up with
				if (message.author.tag == 'ickel2000uk#8152') {
					message.channel.send(`\`\`\`Estimated fuel: ${Math.ceil(fuelEstimate)}\nSafe fuel level (+5%): ${Math.ceil(fuelEstimate + (fuelEstimate * 0.05))}\nPaul level fuel: ${Math.ceil(fuelEstimate + 10)}\`\`\``);
				}
				else {
					message.channel.send(`\`\`\`Estimated fuel: ${Math.ceil(fuelEstimate)}\nSafe fuel level (+5%): ${Math.ceil(fuelEstimate + (fuelEstimate * 0.05))}\`\`\``);
				}
			}
			catch(error) {
				message.channel.send('Incorrect or missing parameters. Usage: ```!racefuel [race time in minutes] [lap time in minutes:seconds.milliseconds] [fuel per lap]```');
			}
		}
	},
};
