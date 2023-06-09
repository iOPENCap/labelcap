import { User } from "@/types";
import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession();
        console.log(session);
        console.log('ok');
        if (!session?.user?.email) {
            return null;
        }
        // const data = fs.readFileSync('config.json', 'utf8')
        // const users = await JSON.parse(data).users;
        // const currentUser = await users.find(
        //     (item: User) =>
        //         item.username === session?.user?.usename
        // );


        // if (!currentUser) {
        //     return null;
        // }

        // return currentUser;
    } catch (error: any) {
        console.log(error)
        return null;
    }
};

export default getCurrentUser;
