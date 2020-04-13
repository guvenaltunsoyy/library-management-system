import React, { useEffect, useState } from "react";
import API from "../utils/api";
import Title from "../components/Title";
import Banner from "../components/Banner";
import MyTable from "../components/MyTable";

export default function Profile() {
  const [user, setUser] = useState();
  const [myBooks, setMyBooks] = useState([]);
  const [calledServices, setCalledServices] = useState(false);

  useEffect(() => {
    if (!calledServices) {
      getAllBooks();
      setCalledServices(true);
    }
  }, [calledServices]);

  async function getAllBooks() {
    setUser(JSON.parse(sessionStorage.getItem("user")));
    var tempArray = [];
    var res = await API.get("getAssignedBooks");
    var res2 = await API.get("getBooks");
    if (res && res.data.success && res2 && res2.data.success) {
      res.data.assignedBooks.map((assigned) => {
        if (
          assigned.userId === JSON.parse(sessionStorage.getItem("user"))?._id
        ) {
          let temp = res2.data.books.filter(
            (b) => b._id === assigned.bookId
          )[0];
          tempArray.push({
            _id: temp._id,
            title: temp.title,
            author: temp.author,
            isbnNumber: temp.isbnNumber,
            createdAt: assigned.createdAt,
            assignedBookId: assigned._id,
            isReceipt: assigned.isReceipt,
          });
        }
      });
      setMyBooks(tempArray);
    }
  }

  return (
    <>
      <Banner
        title={`Merhaba ${user?.name}`}
        subtitle="Aldığın tüm kitaplar aşağıda listelenmektir."
      />
      <section className="services">
        <Title title="Aldığım Kitaplar" />
        <div className="services-center">{<MyTable books={myBooks} />}</div>
      </section>
    </>
  );
}
