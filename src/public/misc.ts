// 图片上传
function uploadImage(url:string,su_title:string,err_title:string){
    return new Promise((resolve,reject)=>{
        uni.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sizeType:['compressed'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success:(res:any)=>{
                console.log(res);
                uni.chooseImage({
                    success: (res:any) => {
                        console.log(res);
				        uni.showLoading({ title: su_title, mask: true });
                        uni.uploadFile({
                            url,
                            filePath: res.tempFiles[0].tempFilePath,
                            name: 'file',
                            header: { accept: 'application/json' },
                            success: (res_img: any) => {
                                resolve(res_img);
                                uni.hideLoading();
                            },
                            fail: (err_img: any) => {
                                reject(err_img);
                                uni.showToast({ title: err_title, icon: 'error', duration: 1000 });
                            },
                        });
                      }
                })
            },
        })
    })
}

export {uploadImage}