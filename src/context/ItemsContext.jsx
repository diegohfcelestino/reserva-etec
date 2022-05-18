/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export const ItemContext = createContext()

export function ItemsProvider({ children }) {
  const [tiposAg, setTiposAg] = useState([])
  const [items, setItems] = useState([])
  const [idTipo, setIdTipo] = useState(0)

  const searchTiposAg = async () => {
    const { data: tipos_item, error } = await supabase
      .from('tipos_item')
      .select('*')

    setTiposAg(tipos_item)
  }

  const getItems = async () => {
    const { data: items, error } = await supabase.from('items').select('*')
    setItems(items)
  }

  async function insertItem(item) {
    const { data, error } = await supabase.from('items').insert(item)

    if (error) {
      return alert('Error inserting item!')
    } else {
      getItems()
      return data
    }
  }

  async function deleteItem(id) {
    const { data, error } = await supabase
      .from('items')
      .delete()
      .match({ id: id })

    if (error) {
      return alert(error)
    } else {
      getItems()
    }
  }

  async function updateItem(item) {
    const { data, error } = await supabase
      .from('items')
      .update(item)
      .match({ id: item.id })
    console.log(item.id)

    if (error) {
      return alert('Error updating item')
    } else {
      getItems()
      return data
    }
  }

  useEffect(() => {
    searchTiposAg()
    getItems()
  }, [])

  return (
    <ItemContext.Provider
      value={{
        items,
        insertItem,
        deleteItem,
        updateItem,
        getItems,
        idTipo,
        setIdTipo,
        tiposAg
      }}
    >
      {children}
    </ItemContext.Provider>
  )
}

export function useItems() {
  return useContext(ItemContext)
}
