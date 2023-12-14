const fs = require('fs');
const path = require('path');
const uploadConfig = require('../config/upload');

// O modulo 'fs' do node é usado para manipular arquivos

class DiskStorage {
  async saveFile(file) {
    // renomear ou mover arquivo
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      // retorna o status do arquivo
      await fs.promises.stat(filePath);
      // caso nao esteja disponível cai no catch
    } catch (error) {
      return false;
    }

    // deletar o arquivo
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;