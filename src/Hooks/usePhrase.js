/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authInstance } from 'API/Instance';

const getDetailPhrase = async (id) => {
  const response = await authInstance.get(`/product/detail/${id}`);
  return response.data;
};

const updatePhrase = async (id, phraseData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await authInstance.put(`/product/${id}`, { product: phraseData }, config);
  return response.data;
};

const deletePhrase = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await authInstance.delete(`/product/${id}`);
  return response.data;
};

const getInfinitePhrase = async ({ pageParam = 0 }) => {
  const skip = pageParam * 200;
  const response = await authInstance.get(`/product?limit=200&skip=${skip}`);
  return response.data;
};

const getMyPhrase = async ({ pageParam = 0, accountname }) => {
  const skip = pageParam * 200;
  const response = await authInstance.get(`/product/${accountname}/?limit=200&skip=${skip}`);
  return response.data;
};

export const useGetInfinitePhrase = () => {
  const [allPhrase, setAllPhrase] = useState([]);
  const {
    data: phrase,
    isLoading,
    isError,
    fetchNextPage: fetchNextPhrase,
    hasNextPage: hasNextPhrase,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: 'phrase',
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getInfinitePhrase(pageParam);
      console.log(response.product);
      return response.product.filter((item) => item.itemName.includes('@cc@'));
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length; // 다음 페이지 인덱스
      const morePagesExist = lastPage.totalCount > nextPage * 200;
      return morePagesExist ? nextPage : undefined;
    },
    placeholderData: [],
    onSuccess: (newData) => {
      setAllPhrase(newData.pages.flat());
    },
  });

  return {
    phrase,
    allPhrase,
    fetchNextPhrase,
    hasNextPhrase,
  };
};

export const useGetMyPhrase = (accountname) => {
  const [myPhrase, setMyPhrase] = useState([]);
  const {
    data: phrase,
    isLoading,
    isError,
    fetchNextPage: fetchNextMyPhrase,
    hasNextPage: hasNextMyPhrase,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['myPhrase', accountname],
    async ({ pageParam = 0 }) => {
      const response = await getMyPhrase({ pageParam, accountname });
      if (response.error) {
        console.error('Error fetching my phrase:', response.error);
      }
      return response.product.filter((item) => item.itemName.includes('@cc@'));
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        const morePagesExist = lastPage.totalCount > nextPage * 200;
        return morePagesExist ? nextPage : undefined;
      },
      placeholderData: [],
      onSuccess: (newData) => {
        setMyPhrase(newData.pages.flat());
      },
    },
  );

  return {
    phrase,
    myPhrase,
    fetchNextMyPhrase,
    hasNextMyPhrase,
    isLoading,
    isError,
    isFetchingNextPage,
  };
};

export const useGetDetailPhrase = (id) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getDetailPhrase(id),
    placeholderData: [],
  });

  return { products, isLoading, isError };
};

export const useUpdatePhrase = (productId, token) => {
  const navigate = useNavigate();

  const { mutate: updatePhraseMutate } = useMutation({
    mutationFn: (phraseData) => updatePhrase(productId, phraseData, token),
    onSuccess: () => navigate(`/phraselist`),
  });

  return { updatePhraseMutate };
};

export const useDeletePhrase = (id, token) => {
  const queryClient = useQueryClient();
  const { mutate: deletePhraseMutate } = useMutation(() => deletePhrase(id, token), {
    onSuccess: () => {
      queryClient.invalidateQueries('phrase');
    },
  });
  return { deletePhraseMutate };
};
