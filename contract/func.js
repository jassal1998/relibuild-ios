import { CallAPIGetPromise } from "../contract/utility/comman"

export const getProjectDetails = async(id,token,dispatch)=>{
return new Promise((resolve, reject) => {
    CallAPIGetPromise(`/contract/get-project/${id}`,token,dispatch).then((res)=>{
        resolve(res)
    }).catch(()=>{
        reject()
    })
})
}