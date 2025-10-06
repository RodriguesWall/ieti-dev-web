/**
 * Função assíncrona que gera o hash de uma senha em SHA-256
 * usando a API nativa de criptografia do navegador (Web Crypto API).
 */
async function hashPassword(password) {

    // 🔹 1. Cria um codificador de texto
    // O TextEncoder transforma a string da senha em bytes (UTF-8)
    const encoder = new TextEncoder();
  
    // 🔹 2. Converte a senha em uma sequência de bytes
    const data = encoder.encode(password);
  
    // 🔹 3. Gera o hash criptográfico SHA-256
    // Essa operação é assíncrona — por isso usamos "await"
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // 🔹 4. Converte o ArrayBuffer (resultado binário) em um array de bytes
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // 🔹 5. Converte cada byte em um valor hexadecimal
    // toString(16) → transforma número em base 16 (hex)
    // padStart(2, '0') → garante que tenha sempre 2 dígitos por byte
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
    // 🔹 6. Retorna a string final (hash em formato hexadecimal)
    return hashHex;
  }
  