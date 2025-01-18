# EB Log Monitor

**EB Log Monitor** is a tool designed to monitor the log files of the EB program to check if the bot has missed any important currencies during its run. It helps ensure that no high-value currency is missed or left behind by the bot.

## How to Use

#### Using the Latest Release

Simply download the latest version from the releases page and run it. This way, you don't need to install Node.js or download the entire project.

#### Running the Code Instead of the Executable

If you prefer to download and run the code instead of the `.exe` file, follow the instructions below:

## Requirements

- Node.js v18 or higher

## Installation

1. Clone or download this project to your local machine.
2. Navigate to the project folder in your terminal.
3. Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

## Configuration

### Automatic Configurarion

The project uses a configuration file in `.json` format, and it can have any name as long as it ends with `.json`.
A default configuration file named `config.json` is provided in the project, which you can use or copy to another location if you prefer.

The `config.json` file has 3 keys:

- **`webhookUrl`**: A string containing the URL of a private Discord webhook where alerts will be sent.
- **`paths`**: An array of strings that stores the file paths of the EB log files.
- **`names`**: An array of strings used to identify which log produced a particular alert. The number of entries in `names` should match the number of paths in `paths` to ensure proper naming functionality.

Example `config.json`:

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/your-webhook-url",
  "paths": [
    "\\\\DESKTOP-YOURMACHINE\\Users\\YOUR_USER\\Documents\\eb\\Log\\lastrun.log",
    "\\\\DESKTOP-YOURMACHINE\\Users\\YOUR_USER\\Documents\\eb\\Log\\lastrun.log"
  ],
  "names": ["Spark", "Monk"]
}
```

Exemple `config.json` path: `C:\Users\YOUR_USER\Documents\config.json`

### Manual Configuration

If you prefer not to use a `.json` file to store your configurations, you can configure the program manually each time you run it.
Simply follow the prompts in the console and fill in the required information.

### Difference in Path Formatting

The only difference between manual configuration and automatic configuration is how you provide the paths to the log files.

In manual configuration, you do not need to add an extra "\\" before each "\\" in the file path.
Example Path for Manual Configuration: `\\DESKTOP-YOURMACHINE\Users\YOUR_USER\Documents\eb\Log\lastrun.log`

### How to Create a Discord Webhook

This video teaches how to create a Discord webhook(_random and very short tutorial video I found on Youtube_): [How to Create a Discord Webhook](https://www.youtube.com/watch?v=xIZXDdVwNaE)

### Note

- Ensure that the number of entries in the `names` array matches the number of file paths in the `paths` array.

## Running the Project

To start the project, run the following command:

```bash
npm start
```

## Compiling to a .exe

If you prefer to compile the project into a `.exe` file, you can run the following command:

```bash
npm run pkg
```

This will start the monitoring process and check if any important currencies are missed in the logs.

## Working with Virtual Machines (VMs)

The project works seamlessly with virtual machines. You can share the log file from the VM with the host machine, and the project will monitor logs from both the VM and the host machine simultaneously.

## Notes

- The project can monitor logs from both the VM and the host, making it versatile for various environments.

---

If you have any issues or suggestions, feel free to open an issue in the repository.
