class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :description, limit: 256
      t.integer :rating
      t.string :user
      t.references :product, index: true

      t.timestamps
    end
  end
end
