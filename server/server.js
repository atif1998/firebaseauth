const express = require("express");
const cors = require("cors");
const { User } = require("./config");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("get data");
  const snap = await User.get();
  const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});
var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(
  cors({
    cors: "*",
  })
);

app.get("/api/user/getByEmail", async (req, res) => {
  try {
    const email = req.query.email;

    const snapshot = await User.where("email", "==", email).get();

    const userData = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      userData.push(data);
    });

    res.status(200).json(userData);
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/user/register", async (req, res) => {
  try {
    const { age, gender, email } = req.body;
    console.log(`age: ${age}, gender: ${gender}, email: ${email}`);

    const snapShot = await User.where("email", "==", email).get();

    snapShot.forEach(async (doc) => {
      try {
        const existingData = doc.data();

        const updatedData = {
          ...existingData,
          age,
          gender,
        };

        await User.doc(doc.id).update(updatedData);
        console.log("Document successfully updated!");
      } catch (updateError) {
        console.error("Error updating document: ", updateError);
      }
    });

    res.status(200).json({ message: "User registration successful" });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addUser", async (req, res) => {
  console.log("user data addition");

  try {
    const userData = req.body;
    const { email } = req.body;

    const userDoc = await User.doc(email).get();

    if (userDoc.exists) {
      const usersData = userDoc.data();
      console.log("data is", usersData);
      return res.status(200).json(usersData);
    } else {
      await User.add(userData);
      return res.status(201).json(userData);
    }
  } catch (error) {
    console.error("Error adding/updating user data to Firestore:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/update", async (req, res) => {
  const id = req.params.id;
  delete req.body.id;
  const data = req.data;
  await User.doc(id).update(data);
  res.send({ msg: "User updated successfully" });
});

app.delete("/delete", async (req, res) => {
  const id = req.params.id;
  await User.doc(id).delete();
  res.send({ msg: "User deleted successfully" });
});

const PORT = process.env.PORT || 8090;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});
