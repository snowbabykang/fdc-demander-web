import Vue from 'vue'
export default {
    // 上传图片路径
    uploadUrl : process.env.UPLOAD_URL,
    checkimg : (file) => {
        return new Promise((resolve, reject) => {
            const isJPEG = file.type === 'image/jpeg';
            const isJPG = file.type === 'image/jpg';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isRAW = file.type === 'image/raw';
            // const isPDF = file.type === 'application/pdf';
            const isPic = isJPG || isJPEG || isPNG || isBMP || isRAW;
            if (!isPic) {
                Vue.prototype.$message.error('支持图片格式.png.jpg.jepg.bmp.raw');
                return reject(false)
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                Vue.prototype.$message.error('图片大小必须小于2MB!');
                return reject(false)
            }
            return resolve(true);

        });
    },
    checkpdf : (file) => {
        return new Promise((resolve, reject) => {
            const isPDF = file.type === 'application/pdf';
            if (!isPDF) {
                Vue.prototype.$message.error('支持pdf文件');
                return reject(false)
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                Vue.prototype.$message.error('文件大小必须小于2MB!');
                return reject(false)
            }
            return resolve(true);

        });
    },
    checkpng : (file) => {
      return new Promise((resolve, reject) => {
          const isPNG = file.type === 'image/png';
          if (!isPNG) {
              Vue.prototype.$message.error('支持png文件');
              return reject(false)
          }
          const isLt2M = file.size / 1024 / 1024 < 2
          if (!isLt2M) {
              Vue.prototype.$message.error('文件大小必须小于2MB!');
              return reject(false)
          }
          return resolve(true);

      });
  },
    getPopupContainer (trigger) {
      return trigger.parentElement
    },
}
