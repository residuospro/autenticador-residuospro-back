class PasswordGenerator {
  characters: string;

  constructor() {
    this.characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }

  generateRandomPassword() {
    let password = "";
    const length = 12;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.characters.length);
      password += this.characters.charAt(randomIndex);
    }
    return password;
  }
}

export default PasswordGenerator;
