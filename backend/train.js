const {NlpManager} = require("node-nlp");
const fs = require("fs").promises;
const asyncHandler = require("./auth/async");


async function trainAndSave() {
    const manager = new NlpManager({languages: ["en"]});

    try{
        const files = await fs.readdir("./intents");

        for (const file of files){
            const data = await fs.readFile(`./intents/${file}`, "utf8");
            const {questions, answers} = JSON.parse(data);
            const intent = file.replace(".json", "");

            questions.forEach((question) =>
                manager.addDocument("en", question, intent)
            );
            answers.forEach((answer) => manager.addAnswer("en", intent, answer));
        }

        await manager.train();
        await manager.save();
        console.log("Training and Saving completed successfully.");
    }
    catch(error){
        console.error("An error occured during training and saving:", error);
    }
};

trainAndSave();