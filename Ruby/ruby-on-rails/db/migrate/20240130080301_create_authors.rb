class CreateAuthors < ActiveRecord::Migration[7.1]
  def change
    create_table :authors do |t|
      t.string :name
      t.string :last_name
      t.boolean :is_alive

      t.timestamps
    end
  end
end
