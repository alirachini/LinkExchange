<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId("website_id_sender")->constrained("websites")->onDelete("Cascade");
            $table->foreignId("website_id_receiver")->constrained("websites")->onDelete("Cascade");
            $table->foreignId("status_id")->constrained("statuses");
            $table->string("article_title");
            $table->string("URL");
            $table->string("link_to_article");
            $table->string("note")->nullable();
            $table->integer("amount");
            $table->boolean("conditional")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('requests');
    }
};
