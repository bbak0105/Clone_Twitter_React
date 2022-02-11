import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// 자동으로 import 하는 법!
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attatchment, setAttatchment] = useState(0);
    useEffect(() => {
        // getNweets();
        dbService.collection("nweets").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        })
    }, []);
    // submit 할 때마다 파이어베이스에 생성할 것이야!
    const onSubmit = async (e) => {
        e.preventDefault();
        // 작동방식은 collection과 비슷해!
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRef.putString(attatchment, "data_url");
        console.log(response);
        // await dbService.collection("nweets").add({ //Promise를 리턴하므로 async - await
        //     text: nweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid
        // });
        // setNweet(""); // 작성뒤에 비워주기
    }
    const onChange = (e) => {
        const { target: { value } } = e;
        setNweet(value);
    }
    const onFileChange = (e) => { //fileReader API 사용
        const { target: { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttatchment(result);
        }
    }
    const onClearPhotoClick = () => {
        setAttatchment(null);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attatchment && (
                    <div>
                        <img src={attatchment} width='50px' height='50px' alt={attatchment} />
                        <button onClick={onClearPhotoClick}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {/* isOwner가 아니면 Delete와 Update가 보이지 않게 한다 */}
                {nweets.map((nweet) => {
                    return (
                        <Nweet
                            key={nweet.id}
                            nweetObject={nweet}
                            isOwner={nweet.creatorId === userObj.uid}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Home;

// const getNweets = async () => {
//     // useState 안에 안써주고 따로 함수로 뺐다.
//     // => 이유는 async 를 써야되기 때문임.
//     const dbNweets = await dbService.collection("nweets").get();
//     dbNweets.forEach((document) => {
//         const nweetObject = {
//             ...document.data(),
//             id: document.id,
//         }
//         setNweets(prev => [nweetObject, ...prev]) // 이전꺼 가져오기!
//     });
//     /**
//      * 컴포넌트형에서 이것과 동일한 것 같다.
//      * 그 전 값의 불변성을 받아준다.
//      * this.setState((prev) => {
//             return {
//                 nweets: [document.data(), ...prev]
//             }
//         });
//      */
// }