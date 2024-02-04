class CreateQuotes < ActiveRecord::Migration[7.1]
  def change
    create_table :quotes do |t|
      t.text :value
      t.integer :author

      t.timestamps
    end
  end
end
