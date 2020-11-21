// idb library for async support in IDB
import { openDB } from "idb";

async function idbAccess() {
  try {
    const db = await openDB("notes-todo-app", 1, {
      upgrade(db) {
        console.log("We have an old or nonexistent db version", db);

        // In case you need to delete pre existing db for new version implementation

        // import { deleteDB } from "idb";
        // await deleteDB("notes", {
        //   blocked() {
        //     alert(
        //       "Please refresh all other tabs running this site. They may be on an older version"
        //     );
        //   }
        // });
        db.createObjectStore("notes", { keyPath: "id" });
        db.createObjectStore("todos", { keyPath: "id" });
      },
      blocked() {
        alert(
          "Please refresh all other tabs running this site. They may be using an older version."
        );
      },
      blocking() {
        alert("Please refresh this tab. It may be running an older version.");
      },
      terminated() {
        console.log("Unexpected termination to IDB connection");
      }
    });
    console.log("here");

    return db;
  } catch (error) {
    console.log("Error connecting to IDB", error);
    return null;
  }
}

// Await this function call
export default idbAccess;
