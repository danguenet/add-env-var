# add-env-var

A CLI tool to easily add environment variables to `.env` files. Generate random secrets, set custom values, and manage multiple environment files with ease. This will not add your `.env` file to your `.gitignore` so make sure you do that manually if relevant.

## Features

- **Automatic .env File Handling:** Automatically creates a `.env` file if one doesn't exist in your current directory.
- **Random Secret Generation:** Generates cryptographically secure random secrets for your environment variables.
- **Custom Variable Values:** Set custom values for your environment variables directly from the command line.
- **Overwrite Protection:** Prompts for confirmation before overwriting existing variables.
- **Multiple Variable Support:** Add multiple environment variables in a single command.
- **Custom Secret Length:** Specify the length of the generated secrets.
- **Custom Environment Files:** Specify a different environment file instead of the default `.env`.
- **Custom Secret Encoding:** Specify the encoding for the generated secret: hex (default), base64, or base64url.

## Installation

You can use `add-env-var` directly with `npx` (no installation required):

```bash
npx add-env-var --help
```

Or install it globally:

```bash
npm install -g add-env-var
```

## Usage

### Basic Usage

Add an environment variable with a generated random secret:

```bash
npx add-env-var YOUR_VARIABLE
```

This will add `YOUR_VARIABLE` with a generated secret to your `.env` file.

### Adding Multiple Variables

You can add multiple variables at once:

``` bash
npx add-env-var VAR1 VAR2 VAR3
```

This will generate random secrets for `VAR1`, `VAR2`, and `VAR3`.

### Setting Custom Values

Set custom values for your environment variables:

```bash
npx add-env-var API_KEY=12345 SECRET_KEY=mysecret
```

This will set `API_KEY` to `12345` and `SECRET_KEY` to `mysecret` in your .env file.

### Specifying Secret Length

Specify the length of the generated secrets (in bytes):

```bash
npx add-env-var TOKEN -l 64
```

This will generate a 64-byte (128 characters in hex) secret for `TOKEN`.

### Using a Different Environment File

Specify a different environment file instead of the default `.env`:

```bash
npx add-env-var RANDOM_SECRET -f .env.local
```

This will add `RANDOM_SECRET` to the `.env.local` file.

### Using a Different Encoding

Specify the encoding for the generated secret using the -e or --encoding option:

```bash
npx add-env-var RANDOM_SECRET -e base64url
```

This will generate a URL-safe Base64-encoded secret for RANDOM_SECRET.

## Options

- `-l, --length <number>`: Length of the generated secret (default is 32 bytes).
- `-f, --file <filepath>`: Specify a different environment file (default is `.env`).
- `-e, --encoding <type>`: Specify the encoding for the generated secret. Options are `hex`, `base64`, and `base64url` (default is `hex`).
- `-h, --help`: Display help information.
- `-V, --version`: Display the version number.

## Examples

### Example 1: Add a Variable with a Random Secret

```bash
npx add-env-var SESSION_SECRET
```

Adds `SESSION_SECRET` with a 32-byte random secret to .env.

### Example 2: Add Multiple Variables with Custom Values

```bash
npx add-env-var API_KEY=abcdef123456 DB_HOST=localhost
```

Sets `API_KEY` to `abcdef123456` and `DB_HOST` to `localhost` in `.env`.

### Example 3: Specify Secret Length and File

```bash
npx add-env-var JWT_SECRET -l 64 -f .env.local
```

Generates a 64-byte secret for `JWT_SECRET` and adds it to `.env.local`.

### Example 4: Generate Secret with Base64 Encoding

```bash
npx add-env-var API_TOKEN -e base64
```

Adds API_TOKEN with a Base64-encoded secret to .env.

### Example 5: Overwrite an Existing Variable

If a variable already exists, you'll be prompted:

```bash
Variable API_KEY already exists in .env. Overwrite? (y/N)
```

Enter `y` to overwrite or `n` to skip.

### Example 6: Using the Help Command

```bash
npx add-env-var --help
```

Displays all available options and usage information.
