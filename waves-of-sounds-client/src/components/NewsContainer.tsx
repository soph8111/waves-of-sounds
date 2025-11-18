
// // https://reactrouter.com/en/main/components/link

// import data from '../services/news.json';

// import { Link } from "react-router-dom";

// function News() {
//   return (
//     <div>
//       <h1>News</h1>
//       <ul>
//         {data.news.map((news) => (
//           <li key={news.id}>
//             <Link to={news.titel} state={news}>{news.titel}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
  
// export default News


import useArticle from "../hooks/useArticle";
import ArticleCard from "./ArticleCard";

const News = () => {
  const { data: articles = [] } = useArticle();

    return (
      <div className="container">
        <h1>news</h1>
        <div id="article_grid">
        {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
  );
  }

export default News


// import useArticle from "../hooks/useArticle";
// import NewArticleForm from "./AdminNewsBlock";
// import ArticleCard from "./ArticleCard";

// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalCloseButton,
//   ModalBody,
//   useDisclosure,
// } from "@chakra-ui/react";

// const News = () => {
//   const { data: articles = [] } = useArticle();
//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//    const { isOpen, onOpen, onClose } = useDisclosure();

//     return (
//       <div className="container">
//         <h1>news</h1>
// {/* Kun synlig for admins: åbner modal med NewArticleForm */}
//       {isAdmin && (
//         <button
//           style={{ margin: "2em 0" }}
//           className="styled_button"
//           onClick={onOpen}
//           title="Add new article"
//         >
//           Add new article
//         </button>
//       )}

//       {/* Modal med formen */}
//       <Modal isOpen={isOpen} onClose={onClose} size="lg">
//         <ModalOverlay />
//         <ModalContent p={4}>
//           <ModalCloseButton />
//           <ModalBody>
//             <NewArticleForm
//               onSaved={() => {
//                 onClose();
//              globalThis.location.reload();
//               }}
//               // onCancel={() => onClose()}
//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>


//         <div id="article_grid">
//         {articles.map((article) => (
//               <ArticleCard key={article.id} article={article} />
//           ))}
//         </div>
//       </div>
//   );
//   }

// export default News