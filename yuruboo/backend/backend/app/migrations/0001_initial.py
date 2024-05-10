# Generated by Django 5.0.4 on 2024-05-09 07:22

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(help_text='ジャンル名', max_length=255)),
                ('icon', models.ImageField(help_text='アイコン', upload_to='genre_icon')),
            ],
        ),
        migrations.CreateModel(
            name='Gathering',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('pos_lat', models.FloatField(help_text='募集場所_緯度')),
                ('pos_lng', models.FloatField(help_text='募集場所_経度')),
                ('body', models.CharField(help_text='本文', max_length=1024)),
                ('num_participant', models.IntegerField(help_text='人数')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='募集開始日時')),
                ('host', models.ForeignKey(help_text='募集者', on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('genre', models.ForeignKey(help_text='ジャンル', on_delete=django.db.models.deletion.PROTECT, to='app.genre')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('body', models.CharField(help_text='本文', max_length=1024)),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='投稿日時')),
                ('gathering', models.ForeignKey(help_text='募集', on_delete=django.db.models.deletion.PROTECT, to='app.gathering')),
                ('sender', models.ForeignKey(help_text='送り手', on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ownership',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('count', models.IntegerField(help_text='本数')),
                ('owner', models.ForeignKey(help_text='所有者', on_delete=django.db.models.deletion.PROTECT, related_name='owner', to=settings.AUTH_USER_MODEL)),
                ('presenter', models.ForeignKey(help_text='贈呈者', on_delete=django.db.models.deletion.PROTECT, related_name='presenter', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Participation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('gathering', models.ForeignKey(help_text='募集', on_delete=django.db.models.deletion.PROTECT, to='app.gathering')),
                ('participant', models.ForeignKey(help_text='参加者', on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
