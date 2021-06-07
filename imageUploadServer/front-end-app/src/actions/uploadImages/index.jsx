import { message, notification } from "antd";
import axios from "axios";
import { hostname } from "../../config";


export const addWorkExperience = (workExp, callBack) => {
      return  axios
          .post(hostname() + "/files/getImagesDataWithUserLocation", {
            jobTitle: workExp.jobTitle,
            company: workExp.company,
            state: workExp.state,
            city: workExp.city,
            experienceDescription: workExp.experienceDescription,
            experienceStartDate: workExp.startDate,
            experienceEndDate: workExp.endDate,
            userId: workExp.userId
          })
          .then(response => {
            if (response.status !== 200) {
                notification.error({message:'Error while adding image'});
            } else {
           response && callBack(response);
            }
          })
          .catch(() => {
              notification.error({message:"error while uploading the file"})
          });
  };

  
export const getAllUserImages = (data,cb) => {
     return axios.get(`${hostname()}/files/getImagesDataWithUserLocation`).then((resp) => {
       
       cb(resp)
      }).catch(()=>{
          message.error("Error in retrieving the data!")
      });
  };